"use client";

import { useAuth } from "@/components/AuthProvider";
import BookCareForm from "@/components/BookCareForm";
import { formInputClass, formLabelClass } from "@/lib/auth/form-styles";
import {
  readBookingsForUser,
  type BookingRequest,
} from "@/lib/auth/bookings-storage";
import {
  Calendar,
  Home,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const serif = { fontFamily: "var(--font-playfair), ui-serif, serif" } as const;

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "What we do", href: "/what-we-do/domiciliary-care" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Advice & care", href: "/advice-and-care" },
  { label: "Enquire", href: "/enquire" },
  { label: "Recruitment", href: "/recruitment" },
] as const;

function formatAddress(booking: BookingRequest) {
  const line2 = booking.addressLine2 ? `, ${booking.addressLine2}` : "";
  return `${booking.addressLine1}${line2}, ${booking.city} ${booking.postcode}`;
}

export default function BookCareContent() {
  const { user, updateProfile } = useAuth();
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [saved, setSaved] = useState(false);

  const loadBookings = useCallback(() => {
    if (!user) return;
    setBookings(readBookingsForUser(user.id));
  }, [user]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  useEffect(() => {
    if (!user) return;
    setPhone(user.phone ?? "");
    setAddressLine1(user.addressLine1 ?? "");
    setAddressLine2(user.addressLine2 ?? "");
    setCity(user.city ?? "");
    setPostcode(user.postcode ?? "");
  }, [user]);

  const handleSaveProfile = () => {
    updateProfile({
      phone: phone.trim(),
      addressLine1: addressLine1.trim(),
      addressLine2: addressLine2.trim(),
      city: city.trim(),
      postcode: postcode.trim(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  const profileComplete = Boolean(
    phone.trim() && addressLine1.trim() && city.trim() && postcode.trim()
  );

  return (
    <div className="bg-surface">
      <div className="border-b border-surface-card bg-white">
        <div className="mx-auto max-w-6xl px-6 py-3 lg:px-10">
          <p className="text-xs font-medium uppercase tracking-wide text-brand">My account</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {exploreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-surface-card bg-surface px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-brand/30 hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1
              className="text-4xl font-normal leading-tight text-neutral-900 sm:text-5xl"
              style={serif}
            >
              Book a <em className="italic">caregiver</em>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Welcome back, {user.firstName}. Save your home details, then request a visit — we
              match you with a Care Professional for care at your location.
            </p>
          </div>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-lg font-semibold text-white">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </span>
        </div>

        {!profileComplete ? (
          <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Complete your phone and home address below so we know where to send your caregiver.
          </p>
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <section className="rounded-2xl border border-surface-card bg-white p-6 shadow-[0_8px_32px_-16px_rgba(63,45,98,0.1)] lg:col-span-2">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
              <User className="h-5 w-5 text-brand" />
              Your details
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="flex items-center gap-2 text-muted">
                  <User className="h-4 w-4" /> Name
                </dt>
                <dd className="mt-0.5 font-medium text-neutral-900">
                  {user.firstName} {user.lastName}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-muted">
                  <Mail className="h-4 w-4" /> Email
                </dt>
                <dd className="mt-0.5 text-body">{user.email}</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className={`${formLabelClass} flex items-center gap-2`}>
                  <Phone className="h-4 w-4 text-brand" /> Phone *
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`${formInputClass} mt-1`}
                />
              </label>
              <label className="block">
                <span className={`${formLabelClass} flex items-center gap-2`}>
                  <Home className="h-4 w-4 text-brand" /> Street address *
                </span>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="14 Oak Lane"
                  className={`${formInputClass} mt-1`}
                />
              </label>
              <label className="block">
                <span className={formLabelClass}>Flat, building (optional)</span>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className={`${formInputClass} mt-1`}
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={formLabelClass}>Town / city *</span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`${formInputClass} mt-1`}
                  />
                </label>
                <label className="block">
                  <span className={formLabelClass}>Postcode *</span>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className={`${formInputClass} mt-1`}
                  />
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveProfile}
              className={`mt-6 w-full rounded-xl py-2.5 text-sm font-medium text-white ${
                saved ? "bg-emerald-600" : "bg-brand hover:bg-brand-dark"
              }`}
            >
              {saved ? "Details saved" : "Save my details"}
            </button>

            <p className="mt-6 text-sm text-muted">
              Need advice first?{" "}
              <Link href="/enquire" className="font-medium text-brand hover:text-brand-dark">
                Send an enquiry
              </Link>
            </p>
          </section>

          <div className="lg:col-span-3">
            <BookCareForm
              key={`${user.addressLine1}-${user.city}-${user.postcode}`}
              onSuccess={loadBookings}
            />
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-surface-card bg-white p-6 shadow-[0_8px_32px_-16px_rgba(63,45,98,0.1)]">
          <h2 className="text-lg font-semibold text-neutral-900">Your booking requests</h2>
          {bookings.length === 0 ? (
            <p className="mt-3 text-sm text-muted">
              No bookings yet. Save your details and submit a home visit request.
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="rounded-xl border border-surface-card p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-neutral-900">
                        Care for {booking.careFor === "me" ? "myself" : "a loved one"}
                      </p>
                      <p className="mt-2 flex items-start gap-2 text-sm text-body">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {formatAddress(booking)}
                      </p>
                      {booking.careNotes ? (
                        <p className="mt-2 text-sm text-muted">{booking.careNotes}</p>
                      ) : null}
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          booking.status === "pending"
                            ? "bg-amber-50 text-amber-800"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {booking.status === "pending" ? "Pending match" : "Matched"}
                      </span>
                      <p className="mt-2 flex items-center justify-end gap-1 text-xs text-muted">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
