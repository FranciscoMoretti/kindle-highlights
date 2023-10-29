import { ClippingsByTitle } from "@/lib/clippings";

// HighlightList component
export const HighlightList: React.FC<{ clippings: ClippingsByTitle }> = ({
  clippings,
}) => {
  console.log(clippings);

  return (
    <div>
      <h2>List of Highlights</h2>
      {clippings
        ? Array.from(clippings).map(([title, clippings], index) => (
            <div key={index}>
              <h3>Book Title: {title}</h3>
              <ul>
                {clippings.map((clipping, subIndex) => (
                  <li key={subIndex}>
                    <p>Title: {clipping.title}</p>
                    <p>Text: {clipping.text}</p>
                    <p>Timestamp: {clipping.timestamp}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        : null}
    </div>
  );
};
