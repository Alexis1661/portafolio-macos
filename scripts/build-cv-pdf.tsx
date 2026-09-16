/**
 * Genera public/cv.pdf a partir de los datos del portafolio (src/data).
 * Ejecutar: npm run cv:pdf
 * Si prefieres tu PDF original, reemplaza public/cv.pdf y omite este script.
 */
import React from 'react'
import { Document, Page, Text, View, StyleSheet, renderToFile } from '@react-pdf/renderer'
import { profile } from '../src/data/profile'
import { projects } from '../src/data/projects'

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', color: '#1d1d1f', lineHeight: 1.4 },
  name: { fontSize: 20, fontFamily: 'Helvetica-Bold' },
  contact: { fontSize: 9.5, color: '#555', marginTop: 3 },
  h2: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 14,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 0.7,
    borderBottomColor: '#999',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  bold: { fontFamily: 'Helvetica-Bold' },
  muted: { color: '#666' },
  italic: { fontFamily: 'Helvetica-Oblique' },
  bullet: { flexDirection: 'row', marginTop: 2, paddingLeft: 8 },
  bulletDot: { width: 10 },
  p: { marginTop: 2 },
})

const Cv = () => (
  <Document title={`CV – ${profile.name}`} author={profile.name} language="es">
    <Page size="A4" style={s.page}>
      <Text style={s.name}>{profile.name}</Text>
      <Text style={s.contact}>
        {profile.phone} · {profile.email} · {profile.github} · {profile.linkedin}
      </Text>

      <Text style={s.h2}>Perfil profesional</Text>
      <Text>
        {profile.summary} {profile.summaryExtended}
      </Text>

      <Text style={s.h2}>Educación</Text>
      {profile.education.map((e) => (
        <View key={e.institution} style={s.row}>
          <Text style={s.bold}>{e.institution}</Text>
          <Text>{e.degree}</Text>
        </View>
      ))}

      <Text style={s.h2}>Formación complementaria</Text>
      {profile.certifications.map((c) => (
        <View key={c.name} style={[s.row, s.p]}>
          <Text>
            <Text style={s.bold}>{c.name}</Text> – {c.issuer}
          </Text>
          <Text style={s.muted}>{c.date}</Text>
        </View>
      ))}

      <Text style={s.h2}>Experiencia laboral</Text>
      {profile.experience.map((x) => (
        <View key={x.company}>
          <View style={s.row}>
            <Text style={s.bold}>
              {x.company} ({x.location})
            </Text>
            <Text style={s.muted}>{x.period}</Text>
          </View>
          <Text style={s.italic}>{x.role}</Text>
          {x.bullets.map((b) => (
            <View key={b} style={s.bullet}>
              <Text style={s.bulletDot}>•</Text>
              <Text style={{ flex: 1 }}>{b}</Text>
            </View>
          ))}
        </View>
      ))}

      <Text style={s.h2}>Proyectos relevantes</Text>
      {projects.map((p) => (
        <View key={p.id} style={s.bullet}>
          <Text style={s.bulletDot}>•</Text>
          <Text style={{ flex: 1 }}>
            <Text style={s.bold}>{p.name}</Text> – {p.role} ({p.tech.join(' / ')}) – {p.year}. {p.description}
          </Text>
        </View>
      ))}

      <Text style={s.h2}>Competencias e intereses</Text>
      <Text style={s.p}>
        <Text style={s.bold}>Habilidades técnicas: </Text>
        {[...profile.skills.languages, ...profile.skills.frameworks, ...profile.skills.areas, ...profile.skills.tools].join(', ')}.
      </Text>
      <Text style={s.p}>
        <Text style={s.bold}>Habilidades personales: </Text>
        {profile.softSkills.join(', ')}.
      </Text>
      <Text style={s.p}>
        <Text style={s.bold}>Idiomas: </Text>
        {profile.languages.map((l) => `${l.name} – ${l.level}`).join(' · ')}
      </Text>
      <Text style={s.p}>
        <Text style={s.bold}>Intereses: </Text>
        {profile.interests.join(', ')}.
      </Text>
    </Page>
  </Document>
)

const out = new URL('../public/cv.pdf', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
await renderToFile(<Cv />, out)
console.log(`PDF generado en ${out}`)
