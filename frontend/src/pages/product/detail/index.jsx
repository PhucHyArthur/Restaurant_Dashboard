import { useParams } from 'react-router-dom'
import DetailPage from './components/detailPage'

const ProductDetail = () => {
  const { id } = useParams()
  console.log("id",id)
  return (
    <DetailPage productId={id} />
  )
}

export default ProductDetail