/**
 * Lógica compartida para calcular el precio actual y el progreso de una subasta ReMarket.
 * El precio baja de forma lineal desde startPrice hasta minPrice durante durationMinutes.
 */
export function calculateAuctionState(product) {
    // Para que sea "realista" pero determinista en cada carga, 
    // simulamos que la subasta empezó hace 'X' minutos.
    // En una app real, esto vendría de 'startTime' en la DB.
    const now = new Date();
    const startTime = new Date(now.getTime() - (now.getMinutes() % product.durationMinutes) * 60000);
    const elapsedMinutes = (now.getTime() - startTime.getTime()) / 60000;

    const remainingMinutes = Math.max(0, product.durationMinutes - elapsedMinutes);
    const totalDrop = product.startPrice - product.minPrice;
    const progressPercent = Math.min(100, (elapsedMinutes / product.durationMinutes) * 100);

    const currentPrice = Math.max(
        product.minPrice,
        Math.floor(product.startPrice - (totalDrop * (progressPercent / 100)))
    );

    return {
        currentPrice,
        progress: progressPercent,
        remainingMinutes: Math.floor(remainingMinutes),
        isFinished: remainingMinutes <= 0
    };
}
