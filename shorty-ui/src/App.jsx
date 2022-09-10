import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [isRedirecting, setIsRedirecting] = useState(true)
  const [result, setResult] = useState({
    link: null,
    created: false,
    error: false
  })

  useEffect(() => {
    const path = window.location.pathname
    if (path !== '/') {
      const shortname = path.substring(1)
      fetch(`https://shorty-api.kevc.workers.dev/api/links?shortname=${shortname}`)
        .then(data => {
          if (data.status === 200) {
            return data.text()
          } else {
            throw new Error("Not found")
          }
        })
        .then(link => window.location.replace(link))
        .catch(() => window.location.replace('/'))
    } else {
      setIsRedirecting(false)
    }

  }, [])

  const createNewLink = async e => {
    e.preventDefault();
    const shortname = e.target.shortname.value
    const link = e.target.link.value
    const data = await fetch('https://shorty-api.kevc.workers.dev/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shortname, link })
    })
    if (data.status === 201) {
      setResult({ link: "/" + shortname, created: true, error: false })
    } else {
      setResult({ link: null, created: false, error: true })
    }
  }

  const spinner = <div class="text-center">
    <div role="status">
      <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  return (
    <div>
      <div className="text-xl font-semibold p-4 mb-6 border">
        Shorty Link Shortener
      </div>

      {isRedirecting ? spinner : (
        <form className='container mx-auto p-4' onSubmit={createNewLink}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">Link</label>
            <input type="url" id="link" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://www.facebook.com/" required />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">Short Name</label>
            <input type="text" id="shortname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="fb" required />
          </div>

          {result.created && !result.error && (
            <div class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg">
              <span class="font-medium">Success!</span> Your shorty link <a className='underline' href={result.link}>{window.location.hostname + result.link}</a> has been created!
            </div>
          )}

          {!result.created && result.error && (
            <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            <span class="font-medium">Uh oh!</span> We have encountered an error. Please try again later. 
          </div>
          )}

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create</button>
        </form>
      )}


    </div>
  );
}

export default App;
