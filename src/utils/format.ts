const maxTimes: [number, Intl.RelativeTimeFormatUnit][] = [
  [60, "seconds"],
  [60, "minutes"],
  [24, "hours"],
  [7, "days"],
  [4.34524, "weeks"],
  [12, "months"],
  [Number.POSITIVE_INFINITY, "years"],
];

export function timeAgo(date: Date) {
  let duration = (date.getTime() - Date.now()) / 1000;

  // @ts-expect-error
  const [_, unit] = maxTimes.find(([amt]) => {
    if (Math.abs(duration) < amt) {
      return true;
    }

    duration /= amt;
  });

  return new Intl.RelativeTimeFormat(navigator.language, {
    style: "narrow",
  }).format(Math.round(duration), unit);
}
