class CurrentMapResponseInterface {
  map: {
    _id: string;
    content: ({ type: number } | null)[][]; // rows x columns
    phase: 1 | 2;
  };
}

export default CurrentMapResponseInterface;
