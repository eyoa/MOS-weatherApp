import React from 'react'
import Link from 'next/link'

function footer() {
    return (<>
    <Link
      href={{
        pathname: "/precipitation",
      }}
    >
      <a>Precipitation</a>
    </Link>
    <Link href="/today">
      <a>Today</a>
    </Link>
    <Link href="/forecast">
      <a>Forecast</a>
    </Link>
    </>)
}

export default footer