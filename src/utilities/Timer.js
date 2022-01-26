import React from "react";

export default function Test(props) {
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [ls, setLs] = React.useState("realest");

  React.useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  React.useEffect(() => {
    // setLs("lol");
  }, [ls]);

  return (
    <>
      {timeLeft}
      <br />
      <button onClick={() => setTimeLeft(30)}>TEST</button>
      <br />
      {ls}
      <br />
      <button onClick={() => setLs('test')}>TEST</button>
      <br />
    </>
  );
}
