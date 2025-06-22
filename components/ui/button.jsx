import * as React from 'react';

export default function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 bg-black text-white rounded hover:bg-red-500"
      {...props}
    >
      {children}
    </button>
  );
}

