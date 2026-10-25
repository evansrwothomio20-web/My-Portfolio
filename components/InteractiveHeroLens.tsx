"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown, Sparkles, Play, ShieldAlert } from "lucide-react";

export default function InteractiveHeroLens() {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouseVelocity, setMouseVelocity] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Smooth mouse coordinates with physics damping
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, vx: 0, vy: 0, speed: 0 });

  const scrollToStory = () => {
    const el = document.getElementById("story");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const nx = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    const dx = nx - mouseRef.current.targetX;
    const dy = ny - mouseRef.current.targetY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    mouseRef.current.targetX = nx;
    mouseRef.current.targetY = ny;
    mouseRef.current.speed = Math.min(dist * 18, 1.0);
    setMouseVelocity(mouseRef.current.speed);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      gl = canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    }

    if (!gl) {
      console.warn("WebGL not supported, falling back to 2D context.");
      return;
    }

    let animationFrameId: number;
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let imageWidth = 1000;
    let imageHeight = 1000;

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        // WebGL Y inverted for textures
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader: Exact Mask Distortion with Liquid Waves, Chromatic Aberration & Volumetric Mist
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;

      uniform sampler2D u_image;
      uniform vec2 u_resolution;
      uniform vec2 u_image_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_velocity;

      // 2D Simplex Noise for organic liquid flow
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                            -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Fractional Brownian Motion (Multi-octave noise)
      float fbm(vec2 p) {
        float val = 0.0;
        val += 0.5000 * snoise(p); p *= 2.02;
        val += 0.2500 * snoise(p); p *= 2.03;
        val += 0.1250 * snoise(p); p *= 2.01;
        return val;
      }

      // Object-fit: cover calculation
      vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 imgRes) {
        float sAspect = screenRes.x / screenRes.y;
        float iAspect = imgRes.x / imgRes.y;
        vec2 cuv = uv;
        if (sAspect > iAspect) {
          float scale = iAspect / sAspect;
          cuv.y = (uv.y - 0.5) * scale + 0.5;
        } else {
          float scale = sAspect / iAspect;
          cuv.x = (uv.x - 0.5) * scale + 0.5;
        }
        return cuv;
      }

      void main() {
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 uvAspect = v_uv * aspect;
        vec2 mouseAspect = u_mouse * aspect;

        // Vector from mouse to pixel
        vec2 toMouse = uvAspect - mouseAspect;
        float dist = length(toMouse);

        // Fluid organic flow fields
        vec2 flow = vec2(
          fbm(v_uv * 2.8 + vec2(u_time * 0.12, u_time * 0.08)),
          fbm(v_uv * 2.8 + vec2(-u_time * 0.10, u_time * 0.14))
        );

        // Interactive ripple pulse & repulsive liquid warp
        float rippleWave = sin(dist * 26.0 - u_time * 4.5) * exp(-dist * 4.2);
        float mousePush = exp(-dist * 5.2) * (0.045 + u_velocity * 0.14);
        vec2 mouseDisplacement = normalize(toMouse + 0.0001) * (mousePush + rippleWave * (0.02 + u_velocity * 0.04));

        // Combined liquid distortion vector
        vec2 totalDisplacement = mouseDisplacement + flow * 0.038;

        // Base UV cover
        vec2 baseUv = getCoverUv(v_uv, u_resolution, u_image_resolution);

        // Chromatic Aberration Dispersion (RGB split on liquid borders)
        float chroma = 0.016 + u_velocity * 0.04;
        vec2 uvR = baseUv + totalDisplacement * (1.0 + chroma);
        vec2 uvG = baseUv + totalDisplacement;
        vec2 uvB = baseUv + totalDisplacement * (1.0 - chroma);

        // Sample Evans' portrait
        float r = texture2D(u_image, uvR).r;
        float g = texture2D(u_image, uvG).g;
        float b = texture2D(u_image, uvB).b;
        vec3 faceColor = vec3(r, g, b);

        // ---------------- VOLUMETRIC MASK & CLOUD VEIL ----------------
        // Two noise octaves creating thick billowing clouds
        float mist1 = fbm(v_uv * 2.2 + flow * 0.6 + vec2(u_time * 0.06, -u_time * 0.04));
        float mist2 = fbm(v_uv * 4.2 - flow * 0.4 + vec2(-u_time * 0.07, u_time * 0.09));
        float rawMist = smoothstep(-0.35, 0.75, mist1 * 0.7 + mist2 * 0.3);

        // The cursor parts the clouds to reveal the face in high clarity
        float clearing = smoothstep(0.05, 0.48, dist);
        
        // Cyclic breathing of the cloud veil
        float breath = sin(u_time * 0.6) * 0.12 + 0.88;
        float effectiveMist = rawMist * clearing * breath;

        // Reference color palette:
        // Top/Right: Radiant creamy amber / golden yellow
        // Bottom/Left: Electric neon cyan / deep azure blue
        vec3 amberVeil = mix(vec3(0.98, 0.96, 0.82), vec3(0.96, 0.62, 0.16), v_uv.x);
        vec3 cyanVeil  = mix(vec3(0.06, 0.78, 0.92), vec3(0.12, 0.35, 0.95), v_uv.y);
        vec3 mistColor = mix(cyanVeil, amberVeil, clamp(v_uv.x * 0.75 + (1.0 - v_uv.y) * 0.6, 0.0, 1.0));

        // Iridescent fringe along mask boundary
        float edgeFringe = pow(1.0 - abs(effectiveMist - 0.5) * 2.0, 2.8);
        vec3 fringeColor = vec3(1.0, 0.35, 0.1) * sin(edgeFringe * 3.14 + u_time) + vec3(0.1, 0.85, 1.0) * cos(edgeFringe * 3.14);
        mistColor += fringeColor * 0.28;

        // Blend face with mist veil (Screen & soft-mix blending)
        vec3 color = mix(faceColor, mistColor, clamp(effectiveMist * 0.85, 0.0, 0.90));
        color += mistColor * pow(effectiveMist, 2.0) * 0.45;

        // ---------------- FULL-BLEED SEAMLESS COVERAGE ----------------
        // Subtle soft cinematic vignette at extreme edges
        float vignette = length(v_uv - 0.5);
        color *= 1.0 - smoothstep(0.48, 0.85, vignette) * 0.25;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Shader compilation helpers
    const createShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uImageResolutionLoc = gl.getUniformLocation(program, "u_image_resolution");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uVelocityLoc = gl.getUniformLocation(program, "u_velocity");

    // Create & setup texture for Evans' face
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Placeholder 1x1 black pixel until image loads
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 10, 10, 255]));

    const img = new Image();
    img.src = "/evans-hero.jpg";
    img.onload = () => {
      if (!gl || !texture) return;
      imageWidth = img.naturalWidth || 1000;
      imageHeight = img.naturalHeight || 1000;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      setIsReady(true);
    };

    // Responsive Canvas Resizing with devicePixelRatio (covers 100% full screen side-to-side)
    const handleResize = () => {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = containerRef.current ? containerRef.current.clientWidth : window.innerWidth;
      const height = containerRef.current ? containerRef.current.clientHeight : window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let startTime = performance.now();
    let currentX = 0.5;
    let currentY = 0.5;
    let currentVel = 0;

    // Render loop
    const render = (now: number) => {
      if (!gl || !program) return;

      const elapsed = (now - startTime) * 0.001;

      // Smooth lerp physics for cursor coordinates
      currentX += (mouseRef.current.targetX - currentX) * 0.085;
      currentY += (mouseRef.current.targetY - currentY) * 0.085;
      currentVel += (mouseRef.current.speed - currentVel) * 0.1;
      mouseRef.current.speed *= 0.94; // Velocity decay

      gl.useProgram(program);

      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uImageResolutionLoc, imageWidth, imageHeight);
      gl.uniform2f(uMouseLoc, currentX, currentY);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uVelocityLoc, currentVel);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (gl) {
        if (program) gl.deleteProgram(program);
        if (texture) gl.deleteTexture(texture);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <section
      id="hero-lens"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      className="relative w-full h-screen min-h-screen overflow-hidden select-none bg-black cursor-crosshair"
    >
      {/* ---------------- FULL-BLEED WEBGL MASK DISTORTION CANVAS ---------------- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
      />

      {/* ---------------- SEAMLESS FULL-BLEED BOTTOM TRANSITION ---------------- */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-20" />

      {/* ---------------- TOP SUBTLE NAVIGATION BAR (ARTIFACT HUD) ---------------- */}
      <header className="absolute top-6 left-6 right-6 z-40 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 pointer-events-auto">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white font-bold tracking-wider">EVANS RWOTHOMIO</span>
          <span className="text-zinc-500">/</span>
          <span className="text-cyan-400 hidden sm:inline">MASK DISTORTION [WEBGL]</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToStory}
            className="bg-white/10 hover:bg-white text-white hover:text-black font-semibold px-4 sm:px-5 py-2 rounded-full backdrop-blur-md border border-white/15 transition-all duration-300 text-xs tracking-wider cursor-pointer shadow-lg"
          >
            Story & Works ↓
          </button>
        </div>
      </header>

      {/* ---------------- MASTER ARTIFACT TYPOGRAPHY (MATCHING REFERENCE EXACTLY) ---------------- */}
      <div className="absolute left-6 sm:left-12 md:left-16 lg:left-24 bottom-16 sm:bottom-20 md:bottom-24 z-30 max-w-4xl pointer-events-auto">
        
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-6 shadow-2xl">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Interactive Fluid Dispersion</span>
        </div>

        {/* Cinematic Header: EXPLORE WHAT'S POSSIBLE (Refined smaller font size) */}
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95] drop-shadow-[0_6px_25px_rgba(0,0,0,0.95)] select-none">
          EXP<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">LO</span>RE<br />
          WHAT&apos;S<br />
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400">P</span>OSSIBLE
          </span>
        </h1>

        {/* Minimalist Subtitle */}
        <p className="mt-5 sm:mt-7 text-zinc-300 font-medium text-xs sm:text-sm md:text-base max-w-lg drop-shadow-lg leading-relaxed">
          Move your cursor across the viewport to warp the optical liquid mask and reveal Evans Rwothomio through prismatic dispersion.
        </p>

        {/* Call to Action Bar */}
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button
            onClick={scrollToStory}
            className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-zinc-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-2xl shadow-cyan-500/25 flex items-center gap-2.5 group cursor-pointer"
          >
            <span>Enter Portfolio</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-4 py-3 rounded-full border border-white/10 shadow-lg">
            <span className={`w-2 h-2 rounded-full ${mouseVelocity > 0.15 ? "bg-amber-400 animate-ping" : "bg-cyan-400"}`} />
            <span className="hidden sm:inline">Liquid distortion in motion</span>
            <span className="sm:hidden">Swipe to distort</span>
          </div>
        </div>

      </div>

      {/* ---------------- BOTTOM RIGHT WATERMARK / HUD ---------------- */}
      <div className="absolute right-6 sm:right-12 bottom-8 sm:bottom-12 z-30 hidden md:flex flex-col items-end pointer-events-none text-right font-mono">
        <span className="text-[11px] text-cyan-400 uppercase tracking-widest font-semibold">
          // ARTIFACTS.DEEO INSPIRATION
        </span>
        <span className="text-white font-extrabold text-sm sm:text-base mt-1 drop-shadow-md">
          EVANS RWOTHOMIO
        </span>
        <span className="text-zinc-400 text-xs">
          Full-Stack Systems Engineer &bull; Uganda
        </span>
      </div>

      {/* ---------------- FLOATING BOTTOM CENTER SCROLL INDICATOR ---------------- */}
      <button
        onClick={scrollToStory}
        aria-label="Scroll to main content"
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 text-zinc-400 hover:text-cyan-400 transition-colors p-2 cursor-pointer flex flex-col items-center gap-1 group"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">SCROLL</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>

    </section>
  );
}
