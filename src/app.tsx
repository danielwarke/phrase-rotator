import { useEffect, useState } from "preact/hooks";
import "./app.css";

const phrases = [
  "Hello world!",
  "The quick brown fox jumped over the lazy dog",
  "Foo bar",
];

const charDelay = 50;

const phraseDelay = 3 * 1000;

export function App() {
  const [displayPhrase, setDisplayPhrase] = useState("");

  function clearPhrase(onComplete: () => void) {
    setDisplayPhrase((currPhrase) => {
      if (currPhrase.length === 0) {
        onComplete();
        return "";
      }

      setTimeout(() => clearPhrase(onComplete), charDelay);
      return currPhrase.substring(0, currPhrase.length - 1);
    });
  }

  function buildPhrase(phrase: string, charIndex = 1, onComplete: () => void) {
    setDisplayPhrase((currPhrase) => {
      if (currPhrase === phrase) {
        onComplete();
        return phrase;
      }

      setTimeout(
        () => buildPhrase(phrase, charIndex + 1, onComplete),
        charDelay,
      );
      return phrase.substring(0, charIndex);
    });
  }

  function loopPhrases(phraseIndex = 0) {
    const phrase = phrases[phraseIndex];
    if (!phrase) {
      // restart looping with index 0
      loopPhrases();
    }

    const onBuildComplete = () => {
      const onClearComplete = () => {
        loopPhrases(phraseIndex + 1);
      };

      setTimeout(() => clearPhrase(onClearComplete), phraseDelay);
    };

    buildPhrase(phrase, 1, onBuildComplete);
  }

  useEffect(() => {
    loopPhrases();
  }, []);

  return (
    <div className="container">
      <h3>
        {displayPhrase}
        <span className="blinking-cursor">|</span>
      </h3>
    </div>
  );
}
