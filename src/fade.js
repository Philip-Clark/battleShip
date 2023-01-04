const fade = (el, reverse = true, time = 500, delay = 0) => {
  el.animate(
    [
      {
        opacity: 1,
        visibility: 'visible',
      },
      {
        visibility: 'visible',
        offset: 0.9,
      },
      {
        opacity: 0,
        visibility: 'hidden',
      },
    ],
    {
      delay: delay,
      direction: reverse ? 'reverse' : 'normal',
      duration: time,
      easing: 'ease',
      fill: 'forwards',
    }
  );
};

export default fade;
