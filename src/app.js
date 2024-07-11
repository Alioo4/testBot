const { Bot } = require("grammy");

const bot = new Bot("6996919565:AAGkB5HlRbpLr8KRhsgD82MabncPNh2DOIc");

const allLocation = [
  { name: "Xadra filiali", lat: 41.32523971269079, lon: 69.24521682883639 },
  { name: "Chilonzor filiali", lat: 41.285639160563775, lon: 69.2037374981452 },
  { name: "Chimboy filiali", lat: 41.34702147189169, lon: 69.2157654834307 },
  { name: "Chimboy filiali", lat: 40.38801720011012, lon: 71.78773455396319 },
  { name: "Xorazm filiali", lat: 41.56176621362884, lon: 60.63137472883639 },
];

const calculateDistance = (a1, b1, a2, b2) => {
  const deltaLat = a2 - a1;
  const deltaLon = b2 - b1;
  return Math.sqrt(deltaLat * deltaLat + deltaLon * deltaLon);
};

const findNearestLocation = (userLocation) => {
  return allLocation.reduce(
    (nearest, location) => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        location.lat,
        location.lon
      );
      return distance < nearest.distance ? { location, distance } : nearest;
    },
    {
      branch: allLocation[0],
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        allLocation[0].lat,
        allLocation[0].lon
      ),
    }
  ).branch;
};

bot.command("start", async (ctx) => {
  await ctx.reply("Najot ta'lim botiga xush kelibsiz🔥🔥🔥");
  await ctx.reply("Joylashgan manzilingizni yuboring📍")
  await ctx.reply("Biz sizga eng yaqin filialimizni locatsiyasin yuboramiz📍")
});

bot.on("message:location", (ctx) => {
  const userLocation = ctx.message.location;
  const nearestBranch = findNearestLocation(userLocation);
  ctx.replyWithLocation(nearestBranch.lat, nearestBranch.lon);
});

bot.start({
  onStart: () => console.log(`${bot.botInfo.username} ishga tushdi!!!`),
});
