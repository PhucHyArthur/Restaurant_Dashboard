import { useParams } from 'react-router-dom'
import DetailPage from './components/detailPage'

const ProductDetail = () => {
  const { id } = useParams()

  return (
    <DetailPage productId={id} />
  )
}

export default ProductDetail