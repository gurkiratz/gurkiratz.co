import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Hackathons: CollectionConfig = {
  slug: 'hackathons',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'date', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Hackathon Name',
    },
    {
      name: 'date',
      type: 'text', // Using text for flexibility like "Jan 11 - 12, 2025"
      required: true,
      label: 'Date',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'project',
      type: 'group',
      label: 'Project Details',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Project Name',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Project Description',
        },
        {
          name: 'websiteUrl',
          type: 'text',
          label: 'Website URL',
        },
        {
          name: 'devpostUrl',
          type: 'text',
          label: 'Devpost URL',
        },
        {
          name: 'githubUrl',
          type: 'text',
          label: 'GitHub URL',
        },
      ],
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Technologies Used',
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'won',
      type: 'checkbox',
      label: 'Won Award?',
      defaultValue: false,
    },
    ...slugField('name'), // Generate slug from the hackathon name
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
