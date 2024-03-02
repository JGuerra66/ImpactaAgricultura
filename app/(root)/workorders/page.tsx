"use client"
import LotLoader from '@/components/shared/LotLoader';
import ProductLoader from '@/components/shared/ProductLoader'
import { useOrganization } from '@clerk/nextjs';
import React from 'react'

function page() {
    const { organization } = useOrganization();
    const orgId = organization?.id;

    if (!orgId) {
        return <div>Loading...</div>; 
    }

    return (
        <div></div>
    )
}

export default page