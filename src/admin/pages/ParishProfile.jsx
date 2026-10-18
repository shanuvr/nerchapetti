import { Church, Image, MapPin, Phone, Save } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';
import { Button, UploadBox } from '../components/Controls';
import { TextInput, Select } from '../components/Field';

const LANGUAGES = [
  { value: 'ml', label: 'മലയാളം (Malayalam)' },
  { value: 'en', label: 'English' },
  { value: 'ta', label: 'தமிழ் (Tamil)' },
  { value: 'hi', label: 'हिन्दी (Hindi)' },
];

export default function ParishProfile() {
  return (
    <div className="max-w-5xl space-y-4">
      <PageHeader
        title="Parish Profile"
        subtitle="How your church appears to parishioners on the kiosk and on digital receipts."
        actions={<Button variant="primary" icon={Save}>Save changes</Button>}
      />

      <div className="space-y-3.5">
        <SectionCard
          title="Parish Identity"
          description="Shown on the welcome screen header badge and on every offering receipt."
          icon={Church}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <TextInput
              label="Church Name (English)"
              defaultValue="St. Mary's Metropolitan Cathedral"
              hint="Appears in the kiosk header and on receipts."
            />
            <TextInput
              label="Church Name (Malayalam)"
              defaultValue="സെന്റ് മേരീസ് കത്തീഡ്രൽ"
              className="sm:[&_input]:font-malayalam"
            />
            <TextInput
              label="Short Parish Name"
              defaultValue="St. Mary's Cathedral"
              hint="Used where space is tight."
            />
            <Select label="Primary Liturgical Language" options={LANGUAGES} />
          </div>
        </SectionCard>

        <SectionCard title="Parish Assets" description="Insignia used on receipts and kiosk headers." icon={Image}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <UploadBox label="Parish Seal / Emblem" hint="PNG or SVG · max 2 MB" />
          </div>
        </SectionCard>

        <SectionCard title="Contact & Office" description="Used for parishioner support and notifications." icon={Phone}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <TextInput label="Parish Office Phone" defaultValue="+91 481 2420311" />
            <TextInput label="Parish WhatsApp Number" defaultValue="+91 94471 00222" hint="Receipt notifications can be sent here." />
            <TextInput label="Parish Email" defaultValue="office@stmaryscathedral.org" className="sm:col-span-2" />
          </div>
        </SectionCard>

        <SectionCard title="Location & Trust Registration" description="Appears on the receipt footer." icon={MapPin}>
          <div className="space-y-3">
            <TextInput
              label="Parish Address"
              defaultValue="Cathedral Junction, Changanacherry, Kerala - 686101"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextInput label="Diocese / Archdiocese" defaultValue="Archdiocese of Changanacherry" />
              <TextInput label="Trust Registration / 80G Tax Exemption No." defaultValue="CH-TR-00892" />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
