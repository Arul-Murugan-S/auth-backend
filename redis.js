const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();


const redisClient = () => {
    return redis.createClient({
      url: process.env.redis_URL,       // for local, host: "local host", port: 6379, 
                                        // or leave it blank as redis.createClient()
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

module.exports = client;

// __________________________________________________________________________________
// const client = redis.createClient();
   
// (async () => {
//     await client.connect();
// })();

// client.on('connect', () => console.log('Redis Client Connected'));
// client.on('error', (err) => console.log('Redis Client Connection Error', err));
// ___________________________________________________________________________________


