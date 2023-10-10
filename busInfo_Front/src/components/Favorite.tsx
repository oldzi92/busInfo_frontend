import { Link } from "react-router-dom";
import { useStopStore } from "../store";

export const Favorite = () => {
  const favoriteList = useStopStore((state) => state.addedItems);

  // console.log(favoriteList);
  return (
    <>
      <article>
        <h3 className="fav">Ulubione:</h3>

        {favoriteList.map((stop) => (
          <div key={stop}>
            <p style={{ display: "flex" }}>
              <span role="img" aria-label="star">
                ⭐
              </span>
              <h2>
                <Link to={`/stop/${stop}`}>{stop}</Link>
              </h2>
            </p>
          </div>
        ))}
      </article>
    </>
  );
};
