import React from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRight } from '@tabler/icons-react'
const AllPropertyButton = () => {
  return (
    <div className="text-center">
              <Link
                to={`/allproperties`}
                title="Click to view all properties"
                className="btn btn-lg see-all-pro"
              >
                See all properties
                <IconArrowRight className="ml-1" />
              </Link>
            </div>
  )
}

export default AllPropertyButton
