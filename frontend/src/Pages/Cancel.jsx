import { useEffect } from "react";

function Cancel() {
  useEffect(() => {
    postorder();
  }, []);

  const postorder = async () => {
    const registerFetchConfig = {
      method: 'DELETE',
      credentials: 'include'
    };

    const response = await fetch('http://localhost:4000/last_order', registerFetchConfig);
    if (response.status === 404) {
      alert('Error');
    }

  };


  return (
    <div>
      <h1 className="mt-3">Purchase cancelled!</h1>
      <a href="/Home" className="btn btn-danger mt-2">
        Back to home
      </a>
    </div>
  );
}

export default Cancel;