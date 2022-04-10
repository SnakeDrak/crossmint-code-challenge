interface SerializableInterface<Type, JSONType = unknown> {
  toJSON(): JSONType;
  fromJSON(obj: unknown): Type;
}

export default SerializableInterface;
