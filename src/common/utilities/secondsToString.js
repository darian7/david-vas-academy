export const secondsToString = (seconds, t, video) => {
  var hour = Math.floor(seconds / 3600);
  var minute = Math.floor((seconds / 60) % 60);
  var second = seconds % 60;
  if (hour == 0)
    return `${minute}  ${t(`scenes.courses.${!video ? "minute" : "min"}`)}`;
  else
    return `${hour} ${t('scenes.courses.hours')} ${minute} ${t('scenes.courses.minute')}`;
}