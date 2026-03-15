"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const storyPages = [
  {
    id: "cover",
    title: "Happy birthday to my first baby.",
    body: [
      "Akala mo lang hindi ikaw ang favorite ko, pero ikaw talaga.",
      "This page is your little birthday universe. Soft, pink, dramatic, and made just for you.",
    ],
    mood: "moodRose",
    mediaType: "image",
    image: "/images/first_image.jpg",
  },
  {
    id: "songs",
    title: "The songs are weird on purpose.",
    body: [
      "Anyway, you might find the songs weird, but may meaning lahat 'yan. Intindihin mo na lang.",
      "Every track here is part of the message, so the music is not just background, it is part of the story.",
    ],
    mood: "moodPeach",
    mediaType: "image",
    image: "/images/second_image.jpg",
  },
  {
    id: "talent",
    title: "You found your talent, and I’m proud of you.",
    body: [
      "Good job on finding out what your talent is. Di ka man magaling kumanta at sumayaw, at least artsy ka.",
      "And honestly, that fits you. You have your own kind of glow, and that matters more than trying to be everybody else.",
    ],
    mood: "moodPink",
    mediaType: "video",
    image: "/images/birthday-gif.gif",
    video: "/videos/second_video.mp4",
  },
  {
    id: "love",
    title: "Love ka ni ate, kahit ang kulit n'yo.",
    body: [
      "Love ka ni ate, love ko kayo kahit ang papangit nyo. Oo, may kasamang pang-aasar kasi ako 'to.",
      "But behind the jokes, you should know this clearly: you are loved loudly, deeply, and for real.",
    ],
    mood: "moodGold",
    mediaType: "image",
    image: "/images/third_image.jpg",
  },
  {
    id: "stepping-up",
    title: "Thank you for being my reverse ate.",
    body: [
      "Thank you my little sistah for stepping up when I couldn't, for being ate to me kahit baliktad haha, thank you for being my big sister kahit mas matanda ako.",
      "That kind of love stays with me. I will never forget that.",
    ],
    mood: "moodLavender",
    mediaType: "video",
    image: "/images/third_image.jpg",
    video: "/videos/third_video.mp4",
  },
  {
    id: "protection",
    title: "I will always protect you.",
    body: [
      "I love you very much. Ipagtatanggol kita kahit di ko mapagtanggol sarili ko.",
      "I'm always here if you need anything. Wag lang pera. HAHAHAHA.",
    ],
    mood: "moodRoseDeep",
    mediaType: "image",
    image: "/images/birthday-gif.gif",
  },
  {
    id: "ending",
    title: "Ingat kayo d'yan. Miss na kita.",
    body: [
      "Miss na kita, miss na kayo. Kahit malayo, nandito pa rin ang love ko for you.",
      "Mwa mwa. Happy birthday, little sister.",
    ],
    mood: "moodSoft",
    mediaType: "cake",
  },
];

const galleryItems = [
  {
    title: "Birthday Replay",
    caption: "A looping little memory for the first highlight.",
    accent: "rose",
    tilt: "tiltLeft",
    mediaType: "video",
    mediaSrc: "/videos/first_video.mp4",
    poster: "/images/first_image.jpg",
  },
  {
    title: "Soft Motion",
    caption: "Another moving moment for the top row of the final page.",
    accent: "peach",
    tilt: "tiltRight",
    mediaType: "video",
    mediaSrc: "/videos/second_video.mp4",
    poster: "/images/second_image.jpg",
  },
  {
    title: "Pretty Frame",
    caption: "A still memory for the second row, soft and sweet.",
    accent: "pink",
    tilt: "tiltForward",
    mediaType: "image",
    mediaSrc: "/images/third_image.jpg",
  },
  {
    title: "First Baby",
    caption: "One more photo frame to close the birthday page properly.",
    accent: "gold",
    tilt: "tiltSoft",
    mediaType: "image",
    mediaSrc: "/images/first_image.jpg",
  },
];

const totalPages = storyPages.length + 1;

export default function Home() {
  const audioRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [showHeroVideo, setShowHeroVideo] = useState(true);

  const activePage = useMemo(() => {
    if (pageIndex < storyPages.length) {
      return storyPages[pageIndex];
    }

    return null;
  }, [pageIndex]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!hasStarted) {
        return;
      }

      if (event.key === "ArrowRight") {
        setPageIndex((current) => Math.min(current + 1, totalPages - 1));
      }

      if (event.key === "ArrowLeft") {
        setPageIndex((current) => Math.max(current - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasStarted]);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
  };

  const startExperience = async () => {
    setHasStarted(true);
    setPageIndex(0);

    const audio = audioRef.current;
    if (audio?.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const nextPage = () => {
    setPageIndex((current) => Math.min(current + 1, totalPages - 1));
  };

  const previousPage = () => {
    setPageIndex((current) => Math.max(current - 1, 0));
  };

  const jumpToPage = (index) => {
    setPageIndex(index);
  };

  const onGalleryPage = pageIndex === storyPages.length;

  return (
    <main className="pageShell">
      <audio ref={audioRef} src="/audio/pretty_girls.mp3" loop preload="auto" />

      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />
      <div className="ambient ambientThree" />

      {!hasStarted ? (
        <section className="welcomeScene">
          <div className="welcomeCopy">
            <p className="eyebrow">Birthday Surprise</p>
            <h1>A little surprise birthday for my Baby Khalil ko.</h1>
           
            <div className="heroActions">
              <button className="primaryButton" onClick={startExperience}>
                Open it po 
              </button>
             
            </div>
          </div>

          <div className="welcomeVisual">
            <div className="portraitCard">
              <div className="portraitGlow" />
              {showHeroVideo ? (
                <video
                  className="portraitVideo"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/birthday-gif.gif"
                  onError={() => setShowHeroVideo(false)}
                >
                  <source src="/videos/first_video.mp4" type="video/mp4" />
                </video>
              ) : (
                <Image
                  src="/images/birthday-gif.gif"
                  alt="Birthday hug"
                  fill
                  sizes="(max-width: 900px) 80vw, 30vw"
                  className="portraitImage"
                  priority
                />
              )}
            </div>
            <div className="badge badgeBottom">Pretty Girlllll ❤️</div>
          </div>
        </section>
      ) : (
        <section className={`storyStage ${activePage?.mood || "moodSoft"}`}>
          {activePage?.mediaType === "cake" ? (
            <div className="birthdayConfetti" aria-hidden="true">
              {Array.from({ length: 18 }, (_, index) => (
                <span
                  key={index}
                  className="confettiPiece"
                  style={{
                    left: `${(index * 7) % 100}%`,
                    animationDelay: `${(index % 6) * 0.35}s`,
                  }}
                />
              ))}
            </div>
          ) : null}

          <div className="storyTopbar">
            <div>
              <p className="eyebrow">Birthday Letter for my Baby Khalil ko</p>
            </div>
            <button className="ghostButton compactButton" onClick={toggleAudio}>
              {isPlaying ? "Pause music" : "Play music"}
            </button>
          </div>

          {!onGalleryPage ? (
            <div className="storyPanel" key={activePage.id}>
              <div className="storyText">
                <p className="eyebrow">{activePage.eyebrow}</p>
                <h2>{activePage.title}</h2>
                <div className="storyParagraphs">
                  {activePage.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="storyArtwork">
                <div className="artFrame">
                  <div className="artFrameInner">
                    {activePage.mediaType === "video" ? (
                      <video
                        className="storyVideo"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={activePage.image}
                      >
                        <source src={activePage.video} type="video/mp4" />
                      </video>
                    ) : activePage.mediaType === "cake" ? (
                      <div className="cakeScene" aria-label="Animated birthday cake">
                        <div className="cakeSpark cakeSparkOne" />
                        <div className="cakeSpark cakeSparkTwo" />
                        <div className="cakeSpark cakeSparkThree" />
                        <div className="cakePlate" />
                        <div className="cakeBody">
                          <div className="cakeLayer cakeLayerTop" />
                          <div className="cakeLayer cakeLayerMiddle" />
                          <div className="cakeLayer cakeLayerBottom" />
                          <div className="cakeIcing" />
                          <div className="cakeDrip cakeDripOne" />
                          <div className="cakeDrip cakeDripTwo" />
                          <div className="cakeDrip cakeDripThree" />
                          <div className="candles">
                            <span className="candle candleOne"><i className="flame" /></span>
                            <span className="candle candleTwo"><i className="flame" /></span>
                            <span className="candle candleThree"><i className="flame" /></span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={activePage.image}
                        alt={activePage.title}
                        fill
                        sizes="(max-width: 900px) 80vw, 30vw"
                        className="storyImage"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="galleryPanel" key="gallery">
              <div className="sectionHeader">
                <p className="eyebrow">Final Page</p>
                <h2>Four little highlights for the birthday girl.</h2>
                <p className="galleryIntro">
                  This last page keeps the 3D photo mood and works best once you replace
                  the repeated GIF with real pictures.
                </p>
              </div>

              <div className="galleryGrid">
                {galleryItems.map((item, index) => (
                  <article
                    key={item.title}
                    className={`galleryCard ${item.accent} ${item.tilt}`}
                    style={{ animationDelay: `${index * 140}ms` }}
                  >
                    <div className="galleryMedia">
                      {item.mediaType === "video" ? (
                        <video
                          className="galleryVideo"
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster={item.poster}
                        >
                          <source src={item.mediaSrc} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={item.mediaSrc}
                          alt={item.title}
                          fill
                          sizes="(max-width: 900px) 90vw, (max-width: 1200px) 40vw, 22vw"
                          className="galleryImage"
                        />
                      )}
                    </div>
                    <div className="galleryContent">
                      <p className="galleryLabel">highlight {String(index + 1).padStart(2, "0")}</p>
                      <h3>{item.title}</h3>
                      <p>{item.caption}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="storyFooter">
            <div className="dotRail" aria-label="Page navigation">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`dotButton ${pageIndex === index ? "isActive" : ""}`}
                  onClick={() => jumpToPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <div className="navButtons">
              <button className="ghostButton compactButton" onClick={previousPage} disabled={pageIndex === 0}>
                Previous
              </button>
              <button
                className="primaryButton compactButton"
                onClick={nextPage}
                disabled={pageIndex === totalPages - 1}
              >
                {onGalleryPage ? "Finished" : "Next page"}
              </button>
            </div>
          </div>
        </section>
      )}

      <button className={`musicDock ${isPlaying ? "isPlaying" : ""}`} onClick={toggleAudio}>
        <span className="musicDot" />
        {isPlaying ? "Music on" : "Music off"}
      </button>
    </main>
  );
}
