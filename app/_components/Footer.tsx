import { brand, nav } from "../_data/site";
import { Logo } from "./Header";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer id="footer" className="bg-navy-deep text-white/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{brand.slogan}</p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex gap-2">
              <Icon name="pin" className="size-4 shrink-0 text-gold" />
              {brand.address}
            </li>
            <li>
              TEL {brand.tel} &nbsp;·&nbsp; FAX {brand.fax}
            </li>
            <li>E-mail {brand.email}</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          {nav.map((item) => (
            <div key={item.label}>
              <p className="mb-3 font-semibold text-white">{item.label}</p>
              <ul className="space-y-2 text-sm">
                {item.children?.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} className="transition hover:text-gold">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs">
          Copyright © 2026 {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
