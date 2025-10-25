import React from 'react'
import HeroSection from './heroSection'
import FeatureHighlightSection from './featureHighlightSection'
import LineCommentingFeature from './lineCommentingFeature'
import StatsAndGallerySection from './statsAndGallarySection'
import CallToActionSection from './callToActionSection'
import LandingHeader from '../ui/landingHeader'

// Main Component: Munitorum Landing Page
export function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <FeatureHighlightSection />
        <LineCommentingFeature />
        <StatsAndGallerySection />
        <CallToActionSection />
      </main>
    </div>
  )
}
// 6. Final Call to Action
