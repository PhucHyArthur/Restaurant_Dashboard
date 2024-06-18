import DetailPage from '../../components/DetailPage'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const {id} = useParams()
 
  return (
    <DetailPage productId={id} />
  )
}

export default ProductDetail