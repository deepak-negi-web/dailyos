import React from 'react'
import axios from 'axios'

const url = 'https://fmrmy.sse.codesandbox.io'

const useAssets = type => {
   const [images, setImages] = React.useState([])
   const [videos, setVideos] = React.useState([])
   const [error, setError] = React.useState('')
   const [status, setStatus] = React.useState('LOADING')

   React.useEffect(() => {
      ;(async () => {
         try {
            const { data } = await axios.get(`${url}?type=${type}`)
            setStatus('SUCCESS')
            switch (type) {
               case 'images':
                  return setImages(data.data)
               case 'videos':
                  return setVideos(data.data)
               default:
                  throw Error('Unknown File Type')
            }
         } catch (err) {
            setStatus('ERROR')
            setError(err.message)
         }
      })()
   }, [type])

   const upload = async ({ title, description, file, clearSelected }) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append(
         'metadata',
         JSON.stringify({
            ...(title && { title }),
            ...(description && { description }),
         })
      )
      const { data } = await axios.post(url, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
      if (Object.keys(data).length > 0 && data.constructor === Object) {
         clearSelected()
      }
   }

   const remove = async key => {
      const { data } = await axios.delete(url, {
         params: { key },
      })
      if (data.success) {
         setImages(images.filter(image => image.key !== key))
      }
   }

   return { status, images, videos, error, remove, upload }
}

export default useAssets