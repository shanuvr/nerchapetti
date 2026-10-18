import { useState } from 'react';
import { Save, Sparkles, Video, UploadCloud, Film } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';
import { Button } from '../components/Controls';
import { TextInput, TextArea, Toggle } from '../components/Field';
import PhonePreview from '../components/PhonePreview';

export default function Slogans() {
  const [activeScreen, setActiveScreen] = useState('welcome');
  const [videoUrl, setVideoUrl] = useState('');

  return (
    <div className="space-y-4">
      <PageHeader
        title="Scriptures & Sanctuary Video"
        subtitle="Manage biblical scripture verses, liturgical slogans, and live Holy Sanctuary darshan."
        actions={<Button variant="primary" icon={Save}>Save changes</Button>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-4">
          {/* Welcome Screen Scriptures */}
          <SectionCard
            title="Screen 1: Welcome & Preparation Verses"
            description="The opening biblical passage parishioners see when approaching the kiosk."
            icon={Sparkles}
          >
            <div className="space-y-3">
              <TextInput
                label="Primary Scripture Verse (Malayalam)"
                defaultValue="സന്തോഷത്തോടെ കൊടുക്കുന്നവനെ ദൈവം സ്നേഹിക്കുന്നു"
                className="[&_input]:font-malayalam"
                hint="2 Corinthians 9:7 — displayed under the altar cross."
              />
              <TextInput
                label="Primary Scripture Verse (English)"
                defaultValue="God loves a cheerful giver."
                hint="Subtext translation."
              />
              <TextArea
                label="Invitation to Prayer (Malayalam)"
                defaultValue="കർത്താവിന്റെ ആലയത്തിലേക്കുള്ള നിങ്ങളുടെ സ്നേഹ സമർപ്പണം"
                className="[&_textarea]:font-malayalam"
              />
              <TextInput
                label="Action Button Tag"
                defaultValue="പ്രാർത്ഥനാപൂർവ്വം സമർപ്പിക്കുക"
                className="[&_input]:font-malayalam"
              />
            </div>
          </SectionCard>

          {/* Offering Screen Verses */}
          <SectionCard
            title="Screen 2: Nerchapetti Offering Verse"
            description="The encouraging scripture shown as coins and notes are placed."
            icon={Sparkles}
          >
            <div className="space-y-3">
              <TextInput
                label="Offering Banner Verse (Malayalam)"
                defaultValue="നിങ്ങളുടെ നേർച്ചയും പ്രാർത്ഥനയും ദൈവസന്നിധിയിൽ സ്മരിക്കപ്പെട്ടിരിക്കുന്നു"
                className="[&_input]:font-malayalam"
                hint="Acts 10:4 — displayed above the wooden Nerchapetti."
              />
              <TextInput
                label="Running Total Label"
                defaultValue="ആകെ സമർപ്പണം"
                className="[&_input]:font-malayalam"
              />
            </div>
          </SectionCard>

          {/* Sanctuary Video Setup */}
          <SectionCard
            title="Screen 3: Sanctuary Darshan & Blessing"
            description="Configure the live altar or holy sanctuary video stream displayed upon completed offering."
            icon={Video}
          >
            <div className="space-y-3">
              <TextInput
                label="Sanctuary Stream or Video URL"
                placeholder="https://example.com/sanctuary_live.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                hint="Provide an MP4 or HLS streaming link to your church's altar webcam."
              />
              <div className="p-3.5 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-center">
                <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-700">Or drag and drop your church sanctuary video here</p>
                <p className="text-[10px] text-slate-400 mt-0.5">MP4 or WebM format up to 50MB</p>
              </div>
              <Toggle label="Autoplay sanctuary video with soft choir audio" defaultChecked />
              <Toggle label="Enable Fullscreen Sanctuary Darshan button" defaultChecked />
            </div>
          </SectionCard>
        </div>

        {/* Live Phone Preview Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-700">Live Kiosk Preview</span>
            <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
              {['welcome', 'nerchapetti', 'thanksgiving'].map((scr) => (
                <button
                  key={scr}
                  onClick={() => setActiveScreen(scr)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold capitalize transition-all cursor-pointer ${
                    activeScreen === scr ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {scr === 'nerchapetti' ? 'box' : scr}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-100/50 flex justify-center">
            <PhonePreview screen={activeScreen} caption={`Showing ${activeScreen} screen preview`} />
          </div>
        </div>
      </div>
    </div>
  );
}
