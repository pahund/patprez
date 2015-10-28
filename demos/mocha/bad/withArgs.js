export default (...args1) => func => (...args2) => func(...args1, ...args2);

