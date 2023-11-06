const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();


const redisClient = () => {
    return redis.createClient({
      url: process.env.redis_URL,                                           
    });
}

const client = redisClient();

(async () => {
    await client.connect();
})();

client.on('error', (err) => {
    console.log(err)
});

client.on('connect', () => {
    console.log("Connected to Redis!")
});

client.on('end', () => {
    console.log("Redis connection ended!")
});

client.on('SIGQUIT', () => {
    client.quit()
});

module.exports = client


