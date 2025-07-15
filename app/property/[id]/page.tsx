import PropertyDetailPage from "../../../property-detail-page"

export default function PropertyPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch property data based on params.id
  return <PropertyDetailPage />
}
