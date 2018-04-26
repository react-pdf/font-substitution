import StandardFont from './standardFont';

export default ({ Run }) => (
  class FontSubstitutionEngine {
    getRuns(string, runs) {
        const res = [];
        let lastFont = null;
        let lastIndex = 0;
        let index = 0;

        for (const run of runs) {
          let defaultFont;

          if (typeof run.attributes.font === 'string') {
            defaultFont = new StandardFont(run.attributes.font);
          } else {
            defaultFont = run.attributes.font;
          }

          for (const char of string.slice(run.start, run.end)) {
            let font = null;

            font = defaultFont;

            if (font !== lastFont) {
              if (lastFont) {
                res.push(
                  new Run(lastIndex, index, { font: lastFont })
                );
              }

              lastFont = font;
              lastIndex = index;
            }

            index += char.length;
          }
        }

        if (lastIndex < string.length) {
          res.push(
            new Run(lastIndex, string.length, { font: lastFont })
          );
        }

        return res;
    }
  }
)
