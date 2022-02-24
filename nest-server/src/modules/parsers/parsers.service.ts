import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ParsersService {
  constructor(private httpService: HttpService) {}
  parseProblem(link) {
    const parserMap = {
      'codeforces.com': this.cfParser,
      'lightoj.com': this.lightOjParser,
    };
    try {
      let hostname = new URL(link).hostname;
      return parserMap[hostname].call(this, link);
    } catch (err) {}
  }

  /**
   *  Parser for codeforces.com
   */
  async cfParser(link) {
    const getPID = (link) => {
      let pid = '',
        parts = link.split('/');
      if (parts.length !== 7) return -1;
      if (parts.includes('contest')) pid = 'CF' + '-' + parts[4] + parts[6];
      if (parts.includes('problemset'))
        pid = 'CF' + '-' + parts.slice(-2).join('');
      return pid.split('?')[0]; // ? ignoring query strings
    };
    const { data } = await lastValueFrom(this.httpService.get(link));
    const $ = cheerio.load(data);

    // extract informations
    let difficulty = 0;
    const tags = [];
    const pid = getPID(link);
    const name = $('.title').html().split('. ')[1];
    $('.roundbox .tag-box').each(function (i, e) {
      const tag = $(this).text().trim();
      if (tag.includes('*') && tag.indexOf('*') === 0)
        difficulty = parseInt(tag.substring(1));
      else tags.push(tag);
    });
    const judgeId = 1;
    return {
      pid,
      name,
      tags,
      difficulty,
      judgeId,
    };
  }

  /**
   *  Parser for lightoj.com
   */
  async lightOjParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link));
    const $ = cheerio.load(data);
    // extract informations
    const pid = $('.tags .is-link').text().trim();
    const name = $('.title').text().trim();
    const difficulty = 0;
    const tags = [];
    const judgeId = 6;
    return {
      pid,
      name,
      tags,
      difficulty,
      judgeId,
    };
  }
}
