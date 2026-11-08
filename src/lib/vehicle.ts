export const normalizeVehiclePlate = (plate: string): string =>
  plate.toUpperCase().replace(/[\s-]+/g, '');
