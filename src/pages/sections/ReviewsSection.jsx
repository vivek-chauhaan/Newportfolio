import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import ReviewCard from '../../components/cards/ReviewCard.jsx'
import Loader from '../../components/common/Loader.jsx'
import useFetch from '../../hooks/useFetch.js'
import reviewService from '../../services/reviewService.js'

export default function ReviewsSection() {
  const { data: reviews, loading } = useFetch(() => reviewService.getApproved(), [])

  if (loading) return <Loader />
  if (!reviews || reviews.length === 0) return null

  return (
    <section id="reviews" className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <SectionTitle eyebrow="Testimonials" title="Client Reviews" />
      <Swiper
        modules={[Autoplay, SwiperPagination]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ delay: 4500 }}
        pagination={{ clickable: true }}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        className="pb-12 [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:h-auto"
      >
        {reviews.map((r) => (
          <SwiperSlide key={r.id} className="!h-auto flex">
            <ReviewCard review={r} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
