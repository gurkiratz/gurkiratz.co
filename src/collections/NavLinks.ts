import type { CollectionConfig } from 'payload'

export const NavLinks: CollectionConfig = {
  slug: 'navlinks',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'href', 'order', 'isActive'],
  },
  access: { read: () => true },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'The display text for the navigation link',
      },
    },
    {
      name: 'href',
      type: 'text',
      required: true,
      admin: {
        description:
          'The URL path for the navigation link (e.g., /about, /projects)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        description:
          'Order of appearance in navigation (lower numbers appear first)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      admin: {
        description: 'Whether this navigation link should be displayed',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      admin: {
        description: 'Whether this link should open in a new tab',
      },
    },
  ],
  defaultSort: 'order',
}
