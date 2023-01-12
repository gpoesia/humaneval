import create from 'zustand';

const useStore = create(
  set => ({
    id: null,
    method: null,
    testAnswers: [],
    exerciseAnswers: [],

    setID: (id) => set(state => ({ id })),
    setMethod: (method) => set(state => ({ method })),
  })
);
export default useStore;
