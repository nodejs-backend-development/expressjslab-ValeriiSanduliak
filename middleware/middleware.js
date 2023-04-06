function performanceTime(req, res, next) {
    const start = process.hrtime();
    res.on('finish', () => {
        const diff = process.hrtime(start);
        const durationMs = diff[0] * 1e3 + diff[1] / 1e6;
        console.log(`Endpoint ${req.originalUrl} completed in ${durationMs.toFixed(2)} ms`);
    });
    next();
}
module.exports = {
    performanceTime,
};
