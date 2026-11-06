import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Composition,
  Img,
  Sequence,
  continueRender,
  delayRender,
  cancelRender,
  interpolate,
  registerRoot,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const paper = "#f3f0e7";
const ink = "#283e33";
const serif = "JournalSerif, Georgia, serif";
const sans = "JournalSans, Arial, sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function useLocalFonts() {
  const [handle] = useState(() => delayRender("Loading journal typefaces"));
  useEffect(() => {
    const fonts = [
      new FontFace("JournalSerif", `url(${staticFile("fonts/latin-1.woff2")})`),
      new FontFace(
        "JournalSerif",
        `url(${staticFile("fonts/latin-0.woff2")})`,
        { style: "italic" },
      ),
      new FontFace("JournalSans", `url(${staticFile("fonts/latin-2.woff2")})`),
    ];
    Promise.all(fonts.map((font) => font.load()))
      .then((loaded) => {
        loaded.forEach((font) => document.fonts.add(font));
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [handle]);
}

function River() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#728eaa", overflow: "hidden" }}>
      <Img
        src={staticFile("photos/sea.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 62%",
          transform: `scale(${interpolate(frame, [0, 150], [1.02, 1.1], clamp)}) translateY(${interpolate(frame, [0, 150], [10, -5], clamp)}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg,rgba(13,35,43,.52),transparent 60%,rgba(13,35,43,.5))",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 72,
          color: paper,
          fontFamily: serif,
          fontSize: 100,
          lineHeight: 0.9,
          letterSpacing: -3,
          opacity: interpolate(frame, [0, 24], [0, 1], clamp),
          transform: `translateY(${interpolate(frame, [0, 38], [28, 0], clamp)}px)`,
        }}
      >
        A little world
        <br />
        <em>of our own.</em>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 42,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "space-between",
          color: paper,
          fontFamily: sans,
          fontSize: 18,
          letterSpacing: 3,
        }}
      >
        <span>TEE & VEEVA</span>
        <span>24 . 11 . 2024 — ∞</span>
      </div>
    </AbsoluteFill>
  );
}
function LittleThings() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 24, stiffness: 90, mass: 1.1 },
  });
  return (
    <AbsoluteFill style={{ background: paper, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 65,
          width: 430,
          height: 570,
          background: "#fffdf5",
          padding: 15,
          transform: `translateY(${(1 - enter) * 70}px) rotate(${interpolate(frame, [0, 150], [-5, -2], clamp)}deg)`,
        }}
      >
        <Img
          src={staticFile("photos/mirror.webp")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 620,
          top: 180,
          color: ink,
          fontFamily: serif,
          fontSize: 113,
          lineHeight: 0.87,
          letterSpacing: -3,
          opacity: interpolate(frame, [12, 40], [0, 1], clamp),
          transform: `translateX(${(1 - enter) * 40}px)`,
        }}
      >
        The little
        <br />
        <em>things.</em>
        <p
          style={{
            fontFamily: sans,
            fontSize: 20,
            letterSpacing: 0,
            lineHeight: 1.7,
            marginTop: 38,
            maxWidth: 400,
          }}
        >
          The ordinary days.
          <br />
          The extraordinary feeling of you.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          right: 65,
          bottom: 45,
          color: ink,
          fontFamily: sans,
          fontSize: 17,
          letterSpacing: 3,
        }}
      >
        JUST US, BEING US.
      </div>
    </AbsoluteFill>
  );
}
function Together() {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 145], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: ink, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 65,
          left: 95,
          width: 430,
          height: 450,
          transform: `translateY(${30 - progress * 45}px) rotate(-3deg)`,
          opacity: interpolate(frame, [5, 30], [0, 1], clamp),
        }}
      >
        <Img
          src={staticFile("photos/little-world.webp")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 55%",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 45,
          right: 95,
          width: 500,
          height: 485,
          transform: `translateY(${-20 + progress * 30}px) rotate(3deg)`,
          opacity: interpolate(frame, [12, 40], [0, 1], clamp),
        }}
      >
        <Img
          src={staticFile("photos/together.webp")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 65,
          textAlign: "center",
          color: paper,
          fontFamily: serif,
          fontSize: 103,
          lineHeight: 1,
          letterSpacing: -2,
          opacity: interpolate(frame, [22, 48], [0, 1], clamp),
        }}
      >
        Always, <em>with you.</em>
      </div>
    </AbsoluteFill>
  );
}
function Chapter({
  children,
  from,
  duration = 150,
}: {
  children: React.ReactNode;
  from: number;
  duration?: number;
}) {
  const frame = useCurrentFrame();
  const local = frame - from;
  const reveal = interpolate(local, [0, 22], [100, 0], clamp);
  return (
    <Sequence from={from} durationInFrames={duration} premountFor={30}>
      <AbsoluteFill
        style={{ clipPath: from === 0 ? "none" : `inset(0 0 ${reveal}% 0)` }}
      >
        {children}
      </AbsoluteFill>
    </Sequence>
  );
}
const RiverPostcard = () => {
  useLocalFonts();
  return (
    <AbsoluteFill style={{ background: paper }}>
      <Chapter from={0}>
        <River />
      </Chapter>
      <Chapter from={120}>
        <LittleThings />
      </Chapter>
      <Chapter from={240} duration={120}>
        <Together />
      </Chapter>
    </AbsoluteFill>
  );
};
const Root = () => (
  <Composition
    id="RiverPostcard"
    component={RiverPostcard}
    width={1280}
    height={720}
    fps={30}
    durationInFrames={360}
  />
);
registerRoot(Root);
