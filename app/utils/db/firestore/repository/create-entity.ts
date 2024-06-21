import type { DocumentReference } from 'firebase-admin/firestore';
import { firestore, modelConverter } from '#utils/firestore.server.js';

/**
 * Creates entity. If entity.id is falsy (empty), an id is created.
 *
 * @param path
 * @param entity
 */
export const createEntity = async <T extends { id: string }>(
  path: string,
  entity: T,
): Promise<void> => {
  let entityRef: DocumentReference<T>;

  if (entity.id) {
    entityRef = firestore
      .collection(path)
      .doc(entity.id)
      .withConverter(modelConverter<T>());
  } else {
    entityRef = firestore
      .collection(path)
      .doc()
      .withConverter(modelConverter<T>());
  }
  await entityRef.set(entity);
};
