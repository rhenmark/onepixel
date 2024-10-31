
export const generateUUID = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2)}`;
  };