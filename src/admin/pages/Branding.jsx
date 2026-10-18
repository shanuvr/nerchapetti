import { Save, Sliders, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';
import { Button } from '../components/Controls';
import { Toggle } from '../components/Field';

export default function Branding() {
  return (
    <div className="max-w-4xl space-y-4">
      <PageHeader
        title="Branding & Sacred Motion"
        subtitle="Configure liturgical animations, candle physics, and visual effects for the church kiosk."
        actions={<Button variant="primary" icon={Save}>Save changes</Button>}
      />

      <div className="space-y-3.5">
        <SectionCard title="Sacred Visual Effects" description="Atmospheric animations running on the church kiosk." icon={Sliders}>
          <div className="space-y-3">
            <Toggle
              label="Rotating Gothic Rose Window"
              hint="The slow cathedral stained-glass rosette in the celestial backdrop."
              defaultChecked
            />
            <Toggle
              label="Flickering Altar Candle Flames"
              hint="Organic flame swaying physics anchored to the candle wicks."
              defaultChecked
            />
            <Toggle
              label="Floating Starlight Particles"
              hint="Gentle points of celestial starlight drifting upward."
              defaultChecked
            />
            <Toggle
              label="Angelic Starlight & Gold Confetti"
              hint="Celebratory celestial shower upon completing an offering."
              defaultChecked
            />
            <Toggle
              label="Resonant Cathedral Bell on Tap"
              hint="Plays procedural bronze church bell chime when entering the kiosk."
              defaultChecked
            />
            <Toggle
              label="Respect Reduced-Motion Preference"
              hint="Follows the device's accessibility settings to soften heavy particle animations."
              defaultChecked
            />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
