
/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
const postToJSON = (doc) => {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}


export default postToJSON