package com.voyage.voyageapi.likes;


import com.voyage.voyageapi.user.User;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LikeResponse {

    private Integer userId;
}
