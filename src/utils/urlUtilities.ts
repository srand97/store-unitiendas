export const decodedUrl = (url: string) => {
    if (!url) return "";
    return decodeURIComponent(url?.split("/")?.pop() || "");
};

export const codedUrl = (url: string) => {
    if (!url) return "";
    return url
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
};

export const lastLocation = (location: string) => {
    if (!location) return "Inicio";
    const lastLocation = location?.split("/")?.pop()?.replace(/-/g, " ")?.replace(/^\w/, (c) => c.toUpperCase());
    const truncatedLocation = (lastLocation?.length ?? 0) > 20 ? lastLocation?.substring(0, 20) + "..." : lastLocation || "Inicio";
    return truncatedLocation;
}