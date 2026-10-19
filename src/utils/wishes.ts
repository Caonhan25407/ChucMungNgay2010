export interface WishTemplate {
  id: string;
  category: 'mom' | 'lover' | 'teacher' | 'sister' | 'colleague' | 'custom';
  categoryLabel: string;
  badge: string;
  title: string;
  recipientDefault: string;
  content: string;
  quote: string;
  authorSignature: string;
}

export const WISH_TEMPLATES: WishTemplate[] = [
  {
    id: 'mom',
    category: 'mom',
    categoryLabel: 'Dành tặng Mẹ kính yêu',
    badge: 'Tình Mẹ Bao La',
    title: 'Gửi Mẹ Yêu Thương Của Con',
    recipientDefault: 'Mẹ yêu dấu',
    content: 'Nhân ngày Phụ nữ Việt Nam 20/10, con xin gửi đến Mẹ lời chúc tốt đẹp nhất. Cảm ơn Mẹ vì bao năm tháng nhọc nhằn, luôn dành trọn tình thương bao la và che chở cho chúng con khôn lớn. Con chỉ mong Mẹ luôn dồi dào sức khỏe, an vui mỗi ngày và mãi là điểm tựa bình yên nhất trong cuộc đời con.',
    quote: 'Mẹ là bông hoa đẹp nhất không bao giờ phai tàn trong trái tim con.',
    authorSignature: 'Con của Mẹ'
  },
  {
    id: 'lover',
    category: 'lover',
    categoryLabel: 'Dành tặng Vợ / Người thương',
    badge: 'Ngọt Ngào & Sâu Sắc',
    title: 'Gửi Nửa Thế Giới Của Anh',
    recipientDefault: 'Em yêu',
    content: 'Chúc em có một ngày 20/10 thật ngập tràn niềm vui, nụ cười luôn rạng rỡ trên môi. Cảm ơn em đã bước vào cuộc sống của anh, mang đến sự dịu dàng, ấm áp và nguồn động lực lớn lao mỗi ngày. Mong em mãi luôn xinh đẹp, hạnh phúc và bình yên bên anh trên mọi chặng đường phía trước.',
    quote: 'Trong mắt anh, nụ cười của em là điều rạng rỡ và quý giá nhất trần gian.',
    authorSignature: 'Yêu và thương em thật nhiều'
  },
  {
    id: 'teacher',
    category: 'teacher',
    categoryLabel: 'Dành tặng Cô giáo kính yêu',
    badge: 'Tri Ân & Tôn Kính',
    title: 'Kính Chúc Cô Giáo Kính Yêu',
    recipientDefault: 'Cô kính yêu',
    content: 'Nhân ngày Phụ nữ Việt Nam 20/10, em xin gửi trọn tấm lòng tri ân sâu sắc nhất đến Cô. Kính chúc Cô luôn mạnh khỏe, trẻ trung, ngập tràn nhiệt huyết và niềm hạnh phúc để tiếp tục chắp cánh cho bao thế hệ học trò bay cao trên bầu trời tri thức rộng mở.',
    quote: 'Cảm ơn Cô đã luôn tận tâm gieo những hạt mầm tri thức và tình yêu thương.',
    authorSignature: 'Học trò của Cô'
  },
  {
    id: 'sister',
    category: 'sister',
    categoryLabel: 'Dành tặng Chị / Em gái',
    badge: 'Yêu Thương & Gắn Kết',
    title: 'Gửi Chị / Em Gái Dễ Thương',
    recipientDefault: 'Chị / Em gái thân thương',
    content: 'Chúc cô gái đáng yêu một ngày 20/10 ngập tràn hoa tươi, quà tặng và niềm vui rạng ngời! Mong rằng bạn sẽ luôn tự tin, duyên dáng, luôn giữ vững nụ cười tươi tắn và gặt hái thật nhiều thành công, hạnh phúc trong mọi ước mơ của mình.',
    quote: 'Hãy luôn rạng rỡ như một đóa hoa hướng dương đón ánh ban mai!',
    authorSignature: 'Thân gửi lời chúc yêu thương'
  },
  {
    id: 'colleague',
    category: 'colleague',
    categoryLabel: 'Dành tặng Nữ đồng nghiệp & Bạn bè',
    badge: 'Rạng Rỡ & Tỏa Sáng',
    title: 'Chúc Mừng Phụ Nữ Việt Nam',
    recipientDefault: 'Những người phụ nữ tuyệt vời',
    content: 'Nhân ngày 20/10, xin gửi đến toàn thể các chị em phụ nữ những lời chúc tốt đẹp nhất. Chúc các bạn luôn tươi trẻ, tràn đầy năng lượng tích cực, tự tin tỏa sáng và đạt được mọi thành tựu xứng đáng cả trong sự nghiệp lẫn cuộc sống gia đình.',
    quote: 'Phụ nữ sinh ra là để được yêu thương, trân trọng và tỏa sáng theo cách riêng của mình.',
    authorSignature: 'Trân trọng & Yêu quý'
  }
];

export interface CustomWishState {
  recipient: string;
  sender: string;
  title: string;
  content: string;
  quote: string;
}

export function formatWishLetter(template: WishTemplate, custom?: Partial<CustomWishState>): CustomWishState {
  return {
    recipient: custom?.recipient?.trim() || template.recipientDefault,
    sender: custom?.sender?.trim() || template.authorSignature,
    title: custom?.title?.trim() || template.title,
    content: custom?.content?.trim() || template.content,
    quote: custom?.quote?.trim() || template.quote,
  };
}

export function validateWishContent(content: string): { isValid: boolean; error?: string } {
  if (!content || content.trim().length === 0) {
    return { isValid: false, error: 'Lời chúc không được để trống.' };
  }
  if (content.trim().length < 10) {
    return { isValid: false, error: 'Lời chúc nên có ít nhất 10 ký tự để bày tỏ tình cảm trọn vẹn.' };
  }
  if (content.trim().length > 1000) {
    return { isValid: false, error: 'Lời chúc không nên vượt quá 1000 ký tự.' };
  }
  return { isValid: true };
}
