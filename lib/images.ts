export const images = {
  hero: "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778932857/centre-for-ageing-better-rQJ3xo-0WYE-unsplash_mhe64i.jpg",
  handsCare:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-kampus-8949833_tldckz.jpg",
  dancing:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933400/pexels-olly-3768131_mdki5q.jpg",
  crafts:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933399/pexels-olly-3791666_nap6fe.jpg",
  caregiver:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933382/pexels-jsme-mila-523821574-18459193_nlhoas.jpg",
  garden:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933365/pexels-kampus-7551662_ock8o9.jpg",
  community:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933350/pexels-jsme-mila-523821574-29372720_niar1j.jpg",
  companionship:
    "https://res.cloudinary.com/dw1n6qugv/image/upload/v1778933332/pexels-jsme-mila-523821574-18429571_lahwba.jpg",
} as const;

export const careGallery = [
  images.handsCare,
  images.dancing,
  images.crafts,
  images.caregiver,
  images.garden,
  images.community,
  images.companionship,
  images.hero,
] as const;

export function careImage(index: number): string {
  return careGallery[index % careGallery.length];
}
