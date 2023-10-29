import BookContent from "@/components/book-content";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <div>Book: {params.slug}</div>
      <BookContent slug={params.slug} />
    </>
  );
}
