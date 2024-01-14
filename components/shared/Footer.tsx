import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <h3>ImpactaAgricultura</h3>
        </Link>
      </div>
    </footer>
  )
}

export default Footer