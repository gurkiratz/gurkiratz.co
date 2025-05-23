import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'year', 'createdAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'type',
      type: 'radio',
      required: false,
      options: ['Personal', 'Hackathon', 'Client', 'Past'],
    },
    { name: 'year', type: 'number', required: false },
    { name: 'thumbnail', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'text', required: true, maxLength: 100 },
    {
      name: 'tags',
      type: 'array',
      required: false,
      minRows: 1,
      maxRows: 10,
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'links',
      type: 'array',
      required: false,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
